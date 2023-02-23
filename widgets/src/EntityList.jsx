const ownerId = "contribut3.near";
const search = props.search ?? "";

const allEntities = (
  Near.view(ownerId, "get_entities", {}, "final", true) ?? []
)
  .filter(([accountId]) => (search ? accountId.includes(search) : true))
  .sort(([a], [b]) => a.localeCompare(b));

if (!allEntities || allEntities.length === 0) {
  return "No entities found!";
}

return (
  <>
    {allEntities.map(([accountId]) => (
      <div key={accountId} className="mb-4">
        <Widget
          src={`${ownerId}/widget/Entity`}
          props={{ accountId, update: props.update }}
        />
      </div>
    ))}
  </>
);
