export const pageview = ({ url }) => {
  window.analytics("event", "page_view", {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }) => {
  window.analytics("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const initialise = ({ clientId }) => {
  window.analytics("config", "G-NJ8JT0DJWJ", {
    client_storage: "none",
    send_page_view: false,
    anonymize_ip: true,
    client_id: clientId,
  });
};
