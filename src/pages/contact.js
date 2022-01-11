import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "use-intl";
import { useFormik } from "formik";
import * as yup from "yup";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Emoji from "@/components/Emoji";
import Layout from "@/components/Layout";

const Contact = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { locale } = useRouter();
  const t = useTranslations("contact");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    initialStatus: {
      submissionSent: false,
    },
    validationSchema: yup.object({
      name: yup.string().required(t("form.nameRequired")),
      email: yup
        .string()
        .email(t("form.emailValid"))
        .required(t("form.emailRequired")),
      subject: yup.string().required(t("form.subjectRequired")),
      message: yup.string().required(t("form.messageRequired")),
    }),
    onSubmit: async (values) => {
      const response = await fetch("/api/mail", {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (response.ok) {
        formik.setStatus({
          submissionSent: true,
        });
      }
      setSnackbarOpen(true);
    },
  });

  const handleSnackbarClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    Object.keys(formik.errors).forEach((fieldName) => {
      formik.setFieldTouched(fieldName);
    });
  }, [locale]);

  return (
    <div>
      <Container maxWidth="md">
        <Box>
          <Typography variant="h3" gutterBottom>
            {t("description.heading")}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {t("description.paragraph")}
          </Typography>
        </Box>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            id="contact-form-name"
            name="name"
            label={t("form.nameLabel")}
            fullWidth
            margin="normal"
            disabled={formik.isSubmitting || formik.status.submissionSent}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            id="contact-form-email"
            name="email"
            label={t("form.emailLabel")}
            fullWidth
            margin="normal"
            disabled={formik.isSubmitting || formik.status.submissionSent}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id="contact-form-subject"
            name="subject"
            label={t("form.subjectLabel")}
            fullWidth
            margin="normal"
            disabled={formik.isSubmitting || formik.status.submissionSent}
            value={formik.values.subject}
            onChange={formik.handleChange}
            error={formik.touched.subject && Boolean(formik.errors.subject)}
            helperText={formik.touched.subject && formik.errors.subject}
          />
          <TextField
            id="contact-form-message"
            name="message"
            label={t("form.messageLabel")}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            disabled={formik.isSubmitting || formik.status.submissionSent}
            value={formik.values.message}
            onChange={formik.handleChange}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            {formik.status.submissionSent ? (
              <Typography variant="body1">
                {`${t("form.success")} `}
                <Emoji symbol="🥳" label="party face emoji" />
              </Typography>
            ) : (
              <>
                <Button
                  color="primary"
                  variant="contained"
                  disabled={formik.isSubmitting}
                  onClick={formik.resetForm}
                >
                  {t("form.reset")}
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={formik.isSubmitting}
                  sx={{ ml: 2 }}
                >
                  {t("form.send")}
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert
          severity={formik.status.submissionSent ? "success" : "error"}
          variant="filled"
          elevation={6}
          onClose={handleSnackbarClose}
          sx={{ width: "100%" }}
        >
          {formik.status.submissionSent
            ? t("snackbar.success")
            : t("snackbar.error")}
        </Alert>
      </Snackbar>
    </div>
  );
};

Contact.getLayout = (page) => {
  return (
    <Layout>
      <main>{page}</main>
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../translations/${locale}.json`)).default,
    },
  };
}

export default Contact;