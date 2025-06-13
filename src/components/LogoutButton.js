import React from 'react';

export default function LogoutButton({ onSignOut }) {
  return (
    <button onClick={onSignOut}>Log Out</button>
  );
}
