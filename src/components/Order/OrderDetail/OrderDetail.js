import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import formatter from "../../../util/formatter";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { ORDER_URL } from "../../../constants/Ports";
import Loader from "../../Loader/Loader";

const OrderDetail = ({ products }) => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchOrder = async (id) => {
    try {
      const res = await fetch(`${ORDER_URL}/list/${id}`);
      const data = await res.json();
      let order = data?.data?.order;
      return order;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const getOrder = async () => {
      const order = await fetchOrder(id);
      setOrder(order);
      setLoading(false);
    };
    getOrder();
  }, [id]);

  const productIdsWithQuantities = order?.productIdsWithQuantities;
  const productsInOrder = [];

  if (!loading)
    for (const item of productIdsWithQuantities) {
      let product = products.find((pro) => pro.id === item.productId);
      let qty = item.quantity;
      productsInOrder.push({ ...product, qty });
    }
  return (
    <>
      {!loading ? (
        <div>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            component={Link}
            to="/orders"
          >
            Back to orders
          </Button>

          <div className="order-summary">
            <Card sx={{ maxWidth: 100 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {order.orderNumber}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="secondary">
                  {formatter.format(order.amount)}
                </Typography>
                <Typography variant="body2"> {order.shipment}</Typography>
                <Typography variant="body2">{order.status}</Typography>
                <Typography variant="body2">
                  Created By: {order.createdBy}
                </Typography>
              </CardContent>
            </Card>
          </div>
          {productsInOrder.length > 0 && (
            <div className="products-list">
              <Typography variant="h4">List of products</Typography>
              <TableContainer component={Paper}>
                <Table
                  sx={{ maxWidth: 650 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell align="right">Qty</TableCell>
                      <TableCell align="right">Unit Price</TableCell>
                      <TableCell align="right">Total Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productsInOrder.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell align="left">
                          {product.brandName}/{product.genericName}{" "}
                          {product.strength} {product.formulation}{" "}
                          {product.packSize}
                        </TableCell>
                        <TableCell align="right">{product.qty}</TableCell>
                        <TableCell align="right">
                          {formatter.format(product.unitPrice)}
                        </TableCell>
                        <TableCell align="right">
                          {formatter.format(product.unitPrice * product.qty)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1>No order found</h1>
        </div>
      )}
    </>
  );
};

export default OrderDetail;
