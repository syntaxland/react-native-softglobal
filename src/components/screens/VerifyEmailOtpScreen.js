// VerifyEmailOtpScreen.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyEmailOtp,
  sendEmailOtp,
} from "../../redux/actions/emailOtpActions";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";

const VerifyEmailOtpScreen = () => {
  const [otp, setOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [countdown, setCountdown] = useState(60);

  const dispatch = useDispatch();
  const history = useHistory();

  const emailOtpVerify = useSelector((state) => state.emailOtpVerify);
  const { loading, success, error } = emailOtpVerify;

  const userRegisterData =
    JSON.parse(localStorage.getItem("registrationData")) || [];
  console.log("userRegisterData:", userRegisterData);

  useEffect(() => {
    if (success) {
      localStorage.removeItem("registrationData");
      setTimeout(() => {
        history.push("/login");
      }, 5000);
    }
  }, [success, history]);

  useEffect(() => {
    let timer;
    if (countdown > 0 && resendDisabled) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    } else if (!resendDisabled) {
      setCountdown(60);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [countdown, resendDisabled]);

  const handleVerifyEmailOtp = () => {
    dispatch(verifyEmailOtp(otp));
  };

  const otpData = {
    first_name: userRegisterData.first_name,
    email: userRegisterData.email,
  };
  console.log("otpData:", otpData);

  const handleResendEmailOtp = () => {
    setResendLoading(true);
    setResendMessage("");
    try {
      dispatch(
        sendEmailOtp(userRegisterData.email, userRegisterData.first_name)
      );
      setResendMessage(`OTP resent to ${userRegisterData.email} successfully.`);
      setResendDisabled(true);
    } catch (error) {
      setResendMessage("Error resending OTP. Please try again.");
    }
    setResendLoading(false);
  };

  return (
    <Container>
      <Row className="justify-content-center text-center mt-5">
        <Col lg={6}>
          <div className="border rounded p-4">
            <h1 className="py-2">Verify OTP</h1>
            {success && (
              <Message variant="success">
                Email verified successfully! You can now log in.
              </Message>
            )}
            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}

            {resendMessage && (
              <Message variant={resendLoading ? "info" : "success"}>
                {resendMessage}
              </Message>
            )}
            <Form className="py-2">
              <Form.Group controlId="otp">
                <Form.Control
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  required
                />
              </Form.Group>
              <div className="py-3">
                <Button
                  onClick={handleVerifyEmailOtp}
                  disabled={loading || success}
                  variant="success"
                  type="submit"
                  className="rounded"
                >
                  Verify OTP
                </Button>
              </div>
            </Form>
            <p>
              OTP has been sent to your email <b>{userRegisterData.email}</b> and
            will expire in 10 minutes. It might take a couple of seconds to deliver.
            </p>
            <Button
              variant="link"
              type="submit"
              disabled={resendDisabled || resendLoading}
              onClick={handleResendEmailOtp}
            >
              {resendLoading
                ? "Resending OTP..."
                : resendDisabled
                ? `Resend OTP (${countdown}sec)`
                : "Resend OTP"}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyEmailOtpScreen;
