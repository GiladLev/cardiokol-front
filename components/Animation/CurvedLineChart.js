import * as d3 from "d3";
import { View, Text, StyleSheet } from "react-native";
import { Path, Svg } from "react-native-svg";

function CurvedLineChart(props) {
  const { width, height, points } = props;
  const lineGenerator = d3.line().curve(d3.curveCardinal);

  const pathData = lineGenerator(points);

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        <Path d={pathData} fill="white" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CurvedLineChart;
