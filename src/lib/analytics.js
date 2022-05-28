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
  window.analytics("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
  });
  window.analytics("config", "G-NJ8JT0DJWJ", {
    send_page_view: false,
    anonymize_ip: true,
    client_id: clientId,
  });
};

export const getPageViews = async ({ dataClient, startDate, slug }) => {
  const response = dataClient.runReport({
    property: "properties/297972468",
    dateRanges: [
      {
        startDate: startDate,
        endDate: "today",
      },
    ],
    metrics: [
      {
        name: "screenPageViews",
      },
    ],
    dimensionFilter: {
      filter: {
        fieldName: "pagePath",
        stringFilter: {
          value: slug,
        },
      },
    },
  });

  return response;
};
