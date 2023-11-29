import UserItem from "./UserItem";

function UserItemCard({ user }) {
  return (
    <>
      {user.profilePhoto && (
        <UserItem label="Profile photo : " content={user.profilePhoto} />
      )}
      <UserItem label="First name : " content={user.firstName} />
      <UserItem label="Last name : " content={user.lastName} />
      <UserItem label="Email : " content={user.email} />
      <UserItem label="Username : " content={user.username} />
      <UserItem label="Is active : " content={user.active ? "yes" : "no"} />
      <UserItem
        label="Created date : "
        content={new Date(user.createdDate).toLocaleString()}
      />
      <UserItem
        label="Modified date : "
        content={new Date(user.modifiedDate).toLocaleString()}
      />
      <UserItem
        label="Last login : "
        content={
          user.lastLogin ? new Date(user.lastLogin).toLocaleString() : ""
        }
      />
    </>
  );
}

export default UserItemCard;
