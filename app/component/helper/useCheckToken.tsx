'use client';
import { useState, useEffect } from 'react';

export default function useCheckToken() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRightRole, setIsRightRole] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token) {
      window.location.href = '/login';
    } else {
      if (role == 'CREATOR' || role == 'ADMIN') {
        setIsLoading(false);
        setIsRightRole(true);
      }
      else {
        setIsLoading(false);
        setIsRightRole(false);
      }
    }  
  }, []);

  return [isLoading, isRightRole];
}