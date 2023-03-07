const ownerId = "contribut3.near";
const accountId = props.accountId;
const notStandalone = props.notStandalone ?? false;
const isPreview = props.isPreview ?? false;
const inboxView = props.inboxView;

if (!accountId) {
  return "Cannot show entity without account ID!";
}

State.init({
  contributionFormHidden: true,
  entity: null,
  founders: [],
});

Near.asyncView(
  ownerId,
  "get_entity",
  { account_id: accountId },
  "final",
  false
).then((entity) => State.update({ entity }));

const profile = Social.getr(`${accountId}/profile`, "final", {
  subscribe: false,
});

Near.asyncView(
  ownerId,
  "get_founders",
  { account_id: accountId },
  "final",
  false
).then((founders) => State.update({ founders }));

const body = (
  <div
    className="d-flex flex-row justify-content-start"
    id={accountId}
    style={{ minHeight: "8em", maxWidth: "100%" }}
  >
    <div className="flex-grow-1 py-3" style={{ maxWidth: "100%" }}>
      <Widget
        src={`${ownerId}/widget/ProfileLine`}
        props={{
          accountId,
          isEntity: true,
          imageSize: "3em",
          update: props.update,
          additionalColumn: inboxView ? (
            <></>
          ) : (
            <div className="d-flex flex-row justify-content-between align-items-center">
              <Widget
                src={`${ownerId}/widget/ActiveIndicator`}
                props={{ active: state.entity.status }}
              />
              <Widget
                src={`${ownerId}/widget/CardMenu`}
                props={{
                  update: props.update,
                  items: [
                    {
                      text: "Propose contribution",
                      icon: "bi-person-up",
                      id: "contribute",
                      onClick: () =>
                        State.update({ contributionFormHidden: false }),
                    },
                    {
                      text: "View details",
                      icon: "bi-info-circle",
                      href: `/#/${ownerId}/widget/Index?tab=entity&accountId=${accountId}`,
                      onClick: () =>
                        props.update({
                          tab: "entity",
                          content: "",
                          search: "",
                          accountId,
                        }),
                    },
                    {
                      text: "Share",
                      icon: "bi-arrow-up-right",
                      id: "share",
                    },
                  ],
                }}
              />
              <Widget
                src={`${ownerId}/widget/ContributionRequestForm`}
                props={{
                  id: `${accountId}ContributionRequestForm`,
                  entity: accountId,
                  hidden: state.contributionFormHidden,
                  onClose: () => State.update({ contributionFormHidden: true }),
                }}
              />
            </div>
          ),
          additionalRow: (
            <>
              <div>
                {state.founders.map((founder) =>
                  state.founders.length === 1 ? (
                    <Widget
                      src={`${ownerId}/widget/ProfileLine`}
                      props={{
                        accountId: founder,
                        isEntity: false,
                        update: props.update,
                      }}
                    />
                  ) : (
                    <Widget
                      src={`${ownerId}/widget/ProfileCircle`}
                      props={{
                        accountId: founder,
                        isEntity: false,
                        update: props.update,
                      }}
                    />
                  )
                )}
              </div>
              <Widget
                src={`${ownerId}/widget/Tags`}
                props={{ tags: profile.tags }}
              />
            </>
          ),
        }}
      />
      <div style={{ maxWidth: "100%", marginTop: "0.5em" }}>
        <Widget
          src={`${ownerId}/widget/DescriptionArea`}
          props={{
            description: state.entity.description || profile.description,
          }}
        />
      </div>
    </div>
  </div>
);

return (
  <div className="border-bottom border-secondary-subtle">
    <div className="px-3 py-0">{body}</div>
  </div>
);
