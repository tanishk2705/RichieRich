import React from "react";
import {
        SignInButton,
        SignedIn,
        SignedOut,
        UserButton
      } from '@clerk/nextjs'

const Header = () => {
  return (
    <div className="fixed top-0">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Header;
