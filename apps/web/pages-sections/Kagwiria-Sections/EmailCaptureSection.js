import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import CustomInput from "/components/CustomInput/CustomInput.js";
import Button from "/components/CustomButtons/Button.js";
import styles from "/styles/jss/nextjs-material-kit/pages/kagwiriaSections.js";

const useStyles = makeStyles(styles);

export default function EmailCaptureSection() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus("");

    if (!email.trim()) {
      setStatus("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "newsletter",
          fullName: "Newsletter Subscriber",
          email: email.trim(),
          payload: { location: "home-email-capture" },
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error || payload?.message || "Unable to subscribe right now.");
      }

      setEmail("");
      setStatus("Subscribed successfully.");
    } catch (error) {
      setStatus(error.message || "Unable to subscribe right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Ride with the mission</h2>
          <p className={classes.description}>Get impact reports, ride updates, and partner opportunities.</p>
          <form onSubmit={onSubmit}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={8} className={classes.formRow}>
                <CustomInput
                  labelText="Your email"
                  id="newsletter"
                  formControlProps={{ fullWidth: true }}
                  inputProps={{ value: email, onChange: (e) => setEmail(e.target.value) }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4} className={classes.formRow}>
                <Button color="primary" fullWidth type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Subscribe"}
                </Button>
              </GridItem>
            </GridContainer>
          </form>
          {status ? <p>{status}</p> : null}
        </GridItem>
      </GridContainer>
    </div>
  );
}
