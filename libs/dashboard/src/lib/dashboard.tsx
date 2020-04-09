import React, { useEffect } from 'react';
import { firestore, storage } from 'firebase';
import './dashboard.scss';

/* eslint-disable-next-line */
export interface DashboardProps {}

export const Dashboard = (props: DashboardProps) => {


  useEffect(() => {
    storage()
  }, [])


  return (
    <div>
      <h1>Welcome to dashboard component!</h1>
    </div>
  );
};

export default Dashboard;
