import React from "react";
import Router from "../../assets/img/error-images/router.svg";
import Card from "../../components/ui/Basic/Card";
import TemplateError from "../../components/ui/Design/TemplateError";
const NoInternet = () => {
  return (
    <TemplateError
      head={"נראה שאין חיבור"}
      secondHead={"לאינטרנט"}
      body={
        <Card
          img={<Router />}
          firstText={"יש לבדוק שהאינטרנט"}
          secondText={"עובד, ושהטלפון הנייד"}
          ThreeRow={"מחובר לאינטרנט"}
        />
      }
      textButton={"הבנתי"}
    />
  );
};

export default NoInternet;
