import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { inject, observer } from 'mobx-react';
import AttorneyList from '@/components/AttorneyList';
import { CircularProgress, Container, Typography } from '@mui/material';

const AttorneysPanelPage = ({ store }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/login');
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (status === "authenticated") {
    return (
      <Container>
        <AttorneyList />
      </Container>
    );
  }

  return null;
};

export default inject(({ store }) => ({ store }))(observer(AttorneysPanelPage));
