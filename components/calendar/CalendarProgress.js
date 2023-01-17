import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarTemplate = () => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    setDates([]);
  }, []);


  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Calendar
        hideExtraDays={true}
        markedDates={{
          "2023-01-15": {
            marked: true,
            // dotColor: "red",
            selected: true,
            selectedColor: "green",
            selectedTextColor: "white",
          },
          "2023-01-13": {
            marked: true,
            // dotColor: "red",
            selected: true,
            selectedColor: "green",
            selectedTextColor: "white",
          },
        }}
      />
    </View>
  );
};

export default CalendarTemplate;
