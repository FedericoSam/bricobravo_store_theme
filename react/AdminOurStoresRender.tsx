import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'

import AdminOurStores from './components/AdminOurStores/AdminOurStores'

const AdminOurStoresRender: FC = () => {
  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin-example.hello-world" />}
        />
      }
    >
      <PageBlock variation="full">
        <AdminOurStores />
      </PageBlock>
    </Layout>
  )
}

export default AdminOurStoresRender
