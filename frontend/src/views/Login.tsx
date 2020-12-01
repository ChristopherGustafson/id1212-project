import { Paper, styled, Tabs, Tab } from '@material-ui/core';
import { useState } from 'react';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

interface TabPanelProps {
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ index, value, children }) => {
  return (
    <div role="tabpanel" hidden={index !== value}>
      {value === index && children}
    </div>
  );
};

const Login: React.FC = () => {
  const [tab, setTab] = useState(0);

  const onChange = (_e: React.ChangeEvent<unknown>, index: number) => {
    setTab(index);
  };

  return (
    <Root>
      <Paper>
        <Tabs onChange={onChange} value={tab} variant="fullWidth" indicatorColor="primary">
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        <Content>
          <TabPanel value={tab} index={0}>
            <LoginForm />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <RegisterForm />
          </TabPanel>
        </Content>
      </Paper>
    </Root>
  );
};

const Root = styled('div')({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Content = styled('div')({
  padding: '2rem',
});

export default Login;
