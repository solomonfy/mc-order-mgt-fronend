const CountDownTimer = () => {
  //   function countDown() {
  var today = new Date();
  setTimeout(
    function () {
      var remainingTime = "";
      var endOfYear = new Date(today.getFullYear(), 12, 0);
      var dif = (endOfYear - today) / 1000,
        ss = Math.floor(dif % 60)
          .toString()
          .padStart(2, "0"),
        ms = Math.floor((dif / 60) % 60)
          .toString()
          .padStart(2, "0"),
        hs = Math.floor((dif / 3600) % 24)
          .toString()
          .padStart(2, "0"),
        ds = Math.floor(dif / 86400)
          .toString()
          .padStart(3, "0");
      remainingTime =
        dif > 0
          ? `${ds} Days ${hs}:${ms}:${ss}`
          : "Sorry. You are already late..!";
      // active && CountDownTimer();
      // this.removeEventListener("change", kill); // possibly redundant
    },
    1000,
    today
  );
  //   }
  // var active = true,
    // kill = (_) => (active = false);
  // this.addEventListener("change", kill);
};

export default CountDownTimer;
