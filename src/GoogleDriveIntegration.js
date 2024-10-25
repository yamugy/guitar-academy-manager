import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';

function GoogleDriveIntegration() {
  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
    scope: 'https://www.googleapis.com/auth/drive.file'
  });

  return (
    <button onClick={() => login()}>구글 드라이브 연동</button>
  );
}

export default GoogleDriveIntegration;

