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

function readApiError(payload, fallback) {
  if (!payload) return fallback;
  if (typeof payload === "string" && payload.trim()) return payload;
  if (typeof payload?.error === "string" && payload.error.trim()) return payload.error;
  if (typeof payload?.message === "string" && payload.message.trim()) return payload.message;
  if (typeof payload?.error?.message === "string" && payload.error.message.trim()) return payload.error.message;
  return fallback;
}

export default function GetInvolvedPage() {
  const classes = useStyles();

  const [lead, setLead] = useState({ fullName: "", email: "", phone: "", message: "" });
  const [donation, setDonation] = useState({ amount: "1000", provider: "stripe", frequency: "one_time", email: "", phone: "" });
  const [leadStatus, setLeadStatus] = useState("");
  const [donationStatus, setDonationStatus] = useState("");
  const [submittingLead, setSubmittingLead] = useState(false);
  const [submittingDonation, setSubmittingDonation] = useState(false);

  const submitLead = async (event) => {
    event.preventDefault();
    setLeadStatus("");

    if (!lead.fullName.trim() || !lead.email.trim()) {
      setLeadStatus("Name and email are required.");
      return;
    }

    setSubmittingLead(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "sponsor",
          fullName: lead.fullName.trim(),
          email: lead.email.trim(),
          phone: lead.phone.trim() || undefined,
          message: lead.message.trim() || undefined,
          payload: { location: "get-involved" },
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(readApiError(payload, "Unable to submit right now."));
      }

      setLead({ fullName: "", email: "", phone: "", message: "" });
      setLeadStatus("Thanks. Your request has been submitted.");
    } catch (error) {
      setLeadStatus(error.message || "Unable to submit right now.");
    } finally {
      setSubmittingLead(false);
    }
  };

  const submitDonation = async (event) => {
    event.preventDefault();
    setDonationStatus("");

    if (!donation.amount || Number(donation.amount) <= 0) {
      setDonationStatus("Enter a valid amount.");
      return;
    }

    if (donation.provider === "mpesa" && !donation.phone.trim()) {
      setDonationStatus("Phone number is required for M-Pesa.");
      return;
    }

    setSubmittingDonation(true);
    try {
      const response = await fetch("/api/donation/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(donation.amount),
          provider: donation.provider,
          frequency: donation.frequency,
          currency: "KES",
          email: donation.email.trim() || undefined,
          phone: donation.phone.trim() || undefined,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(readApiError(payload, "Unable to start donation."));
      }

      const data = payload?.data || {};
      if (data.checkoutUrl) {
        // Use same-tab redirect to avoid popup blockers after async network calls.
        window.location.assign(data.checkoutUrl);
        return;
      }

      if ((data.provider || donation.provider) === "mpesa") {
        setDonationStatus(data.customerMessage || `M-Pesa prompt sent to ${donation.phone}. Complete payment on your phone.`);
        return;
      }

      setDonationStatus(`Donation initialized (${data.provider || donation.provider}). Ref: ${data.reference || "pending"}`);
    } catch (error) {
      setDonationStatus(error.message || "Unable to start donation.");
    } finally {
      setSubmittingDonation(false);
    }
  };

  return (
    <div>
      <Header
        color="transparent"
        brand="Get Involved"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{ height: 300, color: "white" }}
      />
      <Parallax small filter image="/img/bg7.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <h1 className={classes.title}>Fund access. Build legacy.</h1>
              <h4>Corporate sponsorships, one-time donations, monthly support, and speaking invitations.</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.section}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardBody>
                  <h3 className={classes.cardTitle}>Start a donation</h3>
                  <form onSubmit={submitDonation}>
                    <CustomInput
                      labelText="Amount (KES)"
                      id="donation-amount"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{ value: donation.amount, onChange: (e) => setDonation({ ...donation, amount: e.target.value }) }}
                    />
                    <CustomInput
                      labelText="Email (optional)"
                      id="donation-email"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{ value: donation.email, onChange: (e) => setDonation({ ...donation, email: e.target.value }) }}
                    />
                    <CustomInput
                      labelText="Phone (required for M-Pesa)"
                      id="donation-phone"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{ value: donation.phone, onChange: (e) => setDonation({ ...donation, phone: e.target.value }) }}
                    />
                    <div style={{ marginBottom: 16 }}>
                      <label>Provider</label>
                      <select
                        value={donation.provider}
                        onChange={(e) => setDonation({ ...donation, provider: e.target.value })}
                        style={{ width: "100%", height: 40, marginTop: 8 }}
                      >
                        <option value="stripe">Stripe (Card)</option>
                        <option value="mpesa">M-Pesa</option>
                      </select>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label>Frequency</label>
                      <select
                        value={donation.frequency}
                        onChange={(e) => setDonation({ ...donation, frequency: e.target.value })}
                        style={{ width: "100%", height: 40, marginTop: 8 }}
                      >
                        <option value="one_time">One-time</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <Button color="primary" type="submit" disabled={submittingDonation}>
                      {submittingDonation ? "Starting..." : "Start donation"}
                    </Button>
                  </form>
                  {donationStatus ? <p>{donationStatus}</p> : null}
                </CardBody>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardBody>
                  <h3 className={classes.cardTitle}>Partner or sponsor</h3>
                  <form onSubmit={submitLead}>
                    <CustomInput
                      labelText="Name"
                      id="lead-name"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{ value: lead.fullName, onChange: (e) => setLead({ ...lead, fullName: e.target.value }) }}
                    />
                    <CustomInput
                      labelText="Email"
                      id="lead-email"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{ value: lead.email, onChange: (e) => setLead({ ...lead, email: e.target.value }) }}
                    />
                    <CustomInput
                      labelText="Phone"
                      id="lead-phone"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{ value: lead.phone, onChange: (e) => setLead({ ...lead, phone: e.target.value }) }}
                    />
                    <CustomInput
                      labelText="Message"
                      id="lead-message"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        multiline: true,
                        rows: 4,
                        value: lead.message,
                        onChange: (e) => setLead({ ...lead, message: e.target.value }),
                      }}
                    />
                    <Button color="primary" type="submit" disabled={submittingLead}>
                      {submittingLead ? "Submitting..." : "Submit"}
                    </Button>
                  </form>
                  {leadStatus ? <p>{leadStatus}</p> : null}
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
