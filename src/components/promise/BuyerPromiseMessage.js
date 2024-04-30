// BuyerPromiseMessage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import {
  buyerCreatePromiseMessage,
  listBuyerPromiseMessages,
} from "../../redux/actions/PromiseActions";
import Loader from "../Loader";
import Message from "../Message";
import LoaderButton from "../LoaderButton";

function BuyerPromiseMessage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [message, setMessage] = useState("");

  const buyerCreatePromiseMessageState = useSelector(
    (state) => state.buyerCreatePromiseMessageState
  );
  const { loading, success, error } = buyerCreatePromiseMessageState;

  const listBuyerPromiseMessagesState = useSelector(
    (state) => state.listBuyerPromiseMessagesState
  );
  const { buyerPromiseMessages } = listBuyerPromiseMessagesState;
  console.log("buyerPromiseMessages:", buyerPromiseMessages);

  useEffect(() => {
    const promiseId = id;
    dispatch(listBuyerPromiseMessages(promiseId));
  }, [dispatch, id]);

  const handleSubmitReply = (e) => {
    e.preventDefault();

    const promiseMessageData = {
      promise_id: id,
      message: message,
    };

    dispatch(buyerCreatePromiseMessage(promiseMessageData));
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        // history.push("/dashboard");
        window.location.reload();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  // Function to format the timestamp
  const formatTimestamp = (timestamp) => {
    const messageDate = new Date(timestamp);
    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Function to determine if a message is the first of the day
  const isFirstMessageOfDay = (currentIndex, messages) => {
    if (currentIndex === 0) return true;

    const currentDate = new Date(messages[currentIndex].timestamp);
    const prevDate = new Date(messages[currentIndex - 1].timestamp);

    // Check if the messages were sent on different dates
    if (currentDate.toLocaleDateString() !== prevDate.toLocaleDateString()) {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      // Check if the current message was sent today
      if (currentDate.toLocaleDateString() === today.toLocaleDateString()) {
        return "Today";
      }
      // Check if the current message was sent yesterday
      else if (
        currentDate.toLocaleDateString() === yesterday.toLocaleDateString()
      ) {
        return "Yesterday";
      } else {
        // If it's beyond yesterday, return the full date
        return currentDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }
    }

    return false;
  };

  return (
    <Container>
      <div>
        <Row className="d-flex justify-content-center">
          <Col className="border rounded p-4 bg-secondary" xs={10} md={8}>
            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}
            {/* {success && (
              <Message variant="success">Message sent successfully.</Message>
            )} */}

            <h2 className="border rounded p-4 py-2 text-center text-white">
              Promise ID: {id}
            </h2>

            {buyerPromiseMessages?.map((message, index) => (
              <div key={message.id}>
                {isFirstMessageOfDay(index, buyerPromiseMessages) && (
                  <p className="text-center mb-0 mt-3">
                    {new Date(message.timestamp).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })} 
                  </p>
                )}
                <div
                  className={`${
                    message.seller
                      ? "d-flex justify-content-left"
                      : "d-flex justify-content-end"
                  }`}
                  style={{ maxWidth: "75%" }}
                >
                  <div>
                    <div
                      className={`border rounded p-3 my-2 ${
                        message.seller
                          ? "bg-light"
                          : "bg-success justify-content-end" 
                      }`}
                    >
                      <p>
                        <i className="fas fa-user"></i>{" "}
                        {message.buyer_username
                          ? message.buyer_username?.charAt(0).toUpperCase() +
                            message.buyer_username?.slice(1)
                          : message.seller_username?.charAt(0).toUpperCase() +
                            message.seller_username?.slice(1)}
                      </p>
                      <p>{message.message}</p>
                      <p className="d-flex justify-content-end">
                        {" "}
                        {formatTimestamp(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Form onSubmit={handleSubmitReply}>
              <Form.Group controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  placeholder="Type your message"
                  rows={2}
                  value={message}
                  maxLength={1000}
                  onChange={(e) => setMessage(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <div className="py-2">
                <Button
                  className="w-100 rounded"
                  type="submit"
                  variant="primary"
                  disabled={loading}
                >
                  <div className="d-flex justify-content-center">
                    <span className="py-1">
                      Send <i className="fa fa-paper-plane"></i>
                    </span>{" "}
                    {loading && <LoaderButton />}
                  </div>
                </Button>
              </div>
              {success && (
                <Message variant="success">Message sent successfully.</Message>
              )}
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default BuyerPromiseMessage;
