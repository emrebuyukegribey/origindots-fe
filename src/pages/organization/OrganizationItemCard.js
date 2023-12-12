import OrganizationItem from "./OrganizationItem";
import "./OrganizationItemCard.css";

function OrganizationItemCard({ organization }) {
  return (
    <>
      <OrganizationItem label="Name" content={organization.name} />
      <OrganizationItem
        label="Description"
        content={organization.description}
      />
    </>
  );
}

export default OrganizationItemCard;
