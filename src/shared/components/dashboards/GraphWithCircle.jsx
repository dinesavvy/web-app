import PropTypes from "prop-types";
import circleinfo from "../../../assets/images/circleinfo.svg";
import AreaChart from "../../charts/AreaChart";

const GraphWithCircle = ({
  title,
  value,
  trend,
  merchantsCount,
  //   chartImage,
}) => {
  return (
    <div className="chartborder">
      <div className="chartpadding">
        <div>
          <div className="p12 mb-15">
            <div className="fs-16">{title}</div>
            <div className="fs-26 fw-700">{value}</div>
          </div>
          <div className={`trend ${trend > 0 ? "trendGreen" : "trendRed"}`}>
            Trend {trend}%
          </div>
        </div>
        <div>
          <div className="circleinfo mb-10">
            <img src={circleinfo} className="circleAbsolute" alt="" />
            <div className="fs-34 fw-700 z1">{merchantsCount}</div>
            <div className="fs-14 z1">Merchants</div>
          </div>
        </div>
      </div>
      <AreaChart
        labels={["M", "T", "W", "T", "F", "S"]}
        datas={[65, 59, 80, 81, 56, 55, 40]}
        topColor={"rgba(2, 124, 255, 0.5)"}
        bottomColor={"rgba(215, 210, 226, 0.2)"}
        borderColor={"rgba(0, 123, 255, 1)"}
        className={"w-100 mxh"}
      />
      {/* <img src={chartImage} alt="" className="w-100 mxh" /> */}
    </div>
  );
};
export default GraphWithCircle;

GraphWithCircle.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  trend: PropTypes.number.isRequired,
  merchantsCount: PropTypes.number.isRequired,
  chartImage: PropTypes.string,
};
