import { Divider, Paper, styled, Typography } from '@material-ui/core';
import React from 'react';

interface Props {
  title: string;
}

const PageContent: React.FC<Props> = ({ children, title }) => (
  <PageCard>
    <Typography variant="h4">{title}</Typography>
    <ContentDivider />
    {children}
  </PageCard>
);

const PageCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const ContentDivider = styled(Divider)({
  marginBottom: '1rem',
});

export default PageContent;
