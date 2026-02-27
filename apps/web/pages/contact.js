import React, { useState } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CustomInput from "/components/CustomInput/CustomInput.js";
import Button from "/components/CustomButtons/Button.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Parallax from "/components/Parallax/Parallax.js";

import styles from "/styles/jss/nextjs-material-kit/pages/landingPage.js";
import sectionStyles from "/styles/jss/nextjs-material-kit/pages/kagwiriaSections.js";

const useStyles = makeStyles({ ...styles, ...sectionStyles });

export default function ContactPage() {
  const classes = useStyles();
  const [form, setForm] = useState({ fullName: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submitContact = async (event) => {
    event.preventDefault();
    setStatus("");

    if (!form.fullName.trim() || !form.email.trim()) {
      setStatus("Name and email are required.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "contact",
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          message: form.message.trim() || undefined,
          payload: { location: "contact-page" },
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error || payload?.message || "Unable to send message.");
      }

      setForm({ fullName: "", email: "", message: "" });
      setStatus("Message sent successfully.");
    } catch (error) {
      setStatus(error.message || "Unable to send message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Header
        color="transparent"
        brand="Contact"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{ height: 300, color: "white" }}
      />
      <Parallax small filter image="/img/bg.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <h1 className={classes.title}>Let’s talk partnership.</h1>
              <h4>Corporate sponsorship, media requests, or speaking invitations.</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.section}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={7}>
              <Card>
                <CardBody>
                  <h3 className={classes.cardTitle}>Send a message</h3>
                  <form onSubmit={submitContact}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Name"
                          id="contact-name"
                          formControlProps={{ fullWidth: true }}
                          inputProps={{ value: form.fullName, onChange: (e) => setForm({ ...form, fullName: e.target.value }) }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Email"
                          id="contact-email"
                          formControlProps={{ fullWidth: true }}
                          inputProps={{ value: form.email, onChange: (e) => setForm({ ...form, email: e.target.value }) }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="Message"
                          id="contact-message"
                          formControlProps={{ fullWidth: true }}
                          inputProps={{
                            multiline: true,
                            rows: 4,
                            value: form.message,
                            onChange: (e) => setForm({ ...form, message: e.target.value }),
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <Button color="primary" type="submit" disabled={submitting}>
                      {submitting ? "Sending..." : "Send"}
                    </Button>
                  </form>
                  {status ? <p>{status}</p> : null}
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
              <Card>
                <CardBody>
                  <h3 className={classes.cardTitle}>Contact</h3>
                  <p>Email: partnerships@kagwiria.org</p>
                  <p>Location: Nairobi, Kenya</p>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}
