import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Container, Row, Col, Input, Button } from "reactstrap";
import OpenAI from "openai";
import Webcam from "react-webcam";
import Header from "../components/Headers/Header"; // Adjust the path based on your project structure

// Initialize OpenAI API
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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",
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    "HTTP-Referer": "https://yourappdomain.com", // Replace with your site URL
    "X-Title": "My Chatbot App", // Replace with your app name
  }
});

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [heartRate, setHeartRate] = useState(75); // Simulated heart rate value
  const [alertMessage, setAlertMessage] = useState("");
  const [isHappy, setIsHappy] = useState(true); // Placeholder for emotion detection

  useEffect(() => {
    // Simulate heart rate monitoring
    const heartRateInterval = setInterval(() => {
      const simulatedHeartRate = Math.floor(Math.random() * 50) + 60; // Random heart rate between 60 and 110
      setHeartRate(simulatedHeartRate);

      if (simulatedHeartRate <= 80 && simulatedHeartRate > -1) {
        handleVibrationMotor(simulatedHeartRate);
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(heartRateInterval);
  }, []);

  const handleVibrationMotor = async (rate) => {
    setAlertMessage(`Heart rate is ${rate}. Relax and follow these tips:`);

    try {
      // Fetch relaxation tips from GPT-3
      const completion = await openai.chat.completions.create({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "user", content: "Give me some relaxation tips." }
        ],
      });

      const tips = completion.choices[0].message.content;
      setMessages(prevMessages => [
        ...prevMessages,
        { text: `Heart rate is ${rate}. Relax and follow these tips:`, user: "System" },
        { text: tips, user: "GPT" }
      ]);

      // Simulate buzzing the sensor
      alert("Sensor buzzing: Please relax!");
    } catch (error) {
      console.error("Error communicating with OpenAI:", error);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: "Error: Could not get relaxation tips from GPT.", user: "System" }
      ]);
    }
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, user: "You" }]);

      try {
        const completion = await openai.chat.completions.create({
          model: "openai/gpt-3.5-turbo",
          messages: [
            { role: "user", content: input }
          ],
        });

        const botMessage = completion.choices[0].message.content;

        setMessages(prevMessages => [
          ...prevMessages,
          { text: input, user: "You" },
          { text: botMessage, user: "GPT" }
        ]);
      } catch (error) {
        console.error("Error communicating with OpenAI:", error);
        setMessages(prevMessages => [
          ...prevMessages,
          { text: "Error: Could not get response from chatbot.", user: "GPT" }
        ]);
      }

      setInput(""); // Clear the input field
    }
  };

  return (
    <>
      {/* Render the Header component with custom metrics */}
      <Header />

      {/* Raspberry Pi Heart Rate Monitoring Feature */}
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col lg="6" xl="4">
                <Card className="shadow">
                  <CardHeader className="bg-transparent">
                    <h3 className="mb-0">Heart Rate Monitor</h3>
                  </CardHeader>
                  <CardBody>
                    <p>Current Heart Rate: <strong>{heartRate}</strong> BPM</p>
                    {alertMessage && <p>{alertMessage}</p>}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className="shadow">
                  <CardHeader className="bg-transparent">
                    <h3 className="mb-0">Sensor Status</h3>
                  </CardHeader>
                  <CardBody>
                    <p>The sensor will buzz if your heart rate is below or equal to 80 BPM.</p>
                    <p>Heart rate in this range will trigger a request for relaxation tips from GPT.</p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>

      {/* New Chatbot Section */}
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col lg="6" xl="8">
                <Card className="shadow">
                  <CardHeader className="bg-transparent">
                    <h3 className="mb-0">Chatbot</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="chat-window" style={{ maxHeight: "300px", overflowY: "auto" }}>
                      {messages.map((msg, index) => (
                        <div key={index} style={{ margin: "10px 0" }}>
                          <strong>{msg.user}: </strong>
                          <span>{msg.text}</span>
                        </div>
                      ))}
                    </div>
                    <Input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                    />
                    <Button color="primary" onClick={handleSendMessage} style={{ marginTop: "10px" }}>
                      Send
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>

      {/* New Camera Section */}
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col lg="6" xl="4">
                <Card className="shadow">
                  <CardHeader className="bg-transparent">
                    <h3 className="mb-0">Camera</h3>
                  </CardHeader>
                  <CardBody>
                    <Webcam
                      audio={false}
                      screenshotFormat="image/jpeg"
                      videoConstraints={{
                        width: 1280,
                        height: 720,
                        facingMode: "user"
                      }}
                    />
                    {isHappy && <p>Emotion Detected: Happy</p>}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Index;
