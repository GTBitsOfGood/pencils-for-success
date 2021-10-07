import React from 'react';
import { GetServerSideProps } from 'next';
import { withAdminAuthPage } from '@/utils/auth-middleware';
import { SessionAdminUser } from '../api/admin/login';
import { NextIronServerSideContext } from '@/utils/session';

interface AdminDashboardProps {
  user: SessionAdminUser;
}

export default function AdminDashboardPage({ user }: AdminDashboardProps) {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<AdminDashboardProps> =
  withAdminAuthPage(async ({ req }: NextIronServerSideContext) => {
    const user = req.session.get('user') as SessionAdminUser;

    return {
      props: { user },
    };
  });
