import { h, JSX } from "preact";
import { Page } from "../../components/page";
import { IAccount } from "../../models/account";
import { LoginContent } from "./loginContent";

interface IProps {
  client: Window["fetch"];
  account?: IAccount;
  redirectUrl?: string;
}

export function LoginHtml(props: IProps): JSX.Element {
  const { client, ...data } = props;

  return (
    <Page
      nowrapper={true}
      css={["login"]}
      js={["login"]}
      maxWidth={1200}
      title="Liftosaur: Weightlifting Planner and Tracker app | Login"
      ogTitle="Liftosaur: Weightlifting Planner and Tracker app | Login"
      ogDescription="The app that allows you to build weightlifting programs or pick built-in ones and track your progress"
      ogUrl="https://www.liftosaur.com"
      data={data}
      account={props.account}
      client={client}
      url={"/login"}
      redditPixel={true}
    >
      <LoginContent client={client} {...data} />
    </Page>
  );
}
