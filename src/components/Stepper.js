import { Fade } from "@material-ui/core";
import { useState } from "react";
import { connect } from "react-redux";

const Stepper = ({ componentList, componentProps, onComplete, user }) => {
  const [step, setStep] = useState(0);
  const Component = componentList[step];

  return (
    <Fade in timeout={2000}>
      <Component
        setStep={setStep}
        onComplete={onComplete}
        step={step}
        {...componentProps}
        user={user}
      />
    </Fade>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(Stepper);
