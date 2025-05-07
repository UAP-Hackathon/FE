import React from 'react'
import Layout from '../../components/layout/Layout'
import { useAuth } from '../../context/Auth'

function Profile() {
    const { user } = useAuth();
  return (
    <Layout>
      <div>Profile</div>
    </Layout>
  )
}

export default Profile