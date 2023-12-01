import UserItem from "./UserItem";

function UserItemCard({ user, t }) {
  return (
    <>
      {user.profilePhoto && (
        <UserItem label="Profile photo : " content={user.profilePhoto} />
      )}
      <UserItem label={t("First name")} content={user.firstName} />
      <UserItem label={t("Last name")} content={user.lastName} />
      <UserItem label={t("Email")} content={user.email} />
      <UserItem label={t("Username")} content={user.username} />
      <UserItem label={"Active"} content={user.active ? "yes" : "no"} />
      <UserItem
        label={t("Created Date")}
        content={new Date(user.createdDate).toLocaleString()}
      />
      <UserItem
        label={t("Modified Date")}
        content={new Date(user.modifiedDate).toLocaleString()}
      />
      <UserItem
        label={t("Last Login")}
        content={
          user.lastLogin ? new Date(user.lastLogin).toLocaleString() : ""
        }
      />
    </>
  );
}

export default UserItemCard;
