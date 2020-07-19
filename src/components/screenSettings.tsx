import { h, JSX } from "preact";
import { FooterView } from "./footer";
import { HeaderView } from "./header";
import { IDispatch } from "../ducks/types";
import { MenuItem } from "./menuItem";
import { Thunk } from "../ducks/thunks";

interface IProps {
  dispatch: IDispatch;
  email?: string;
  currentProgram?: string;
}

export function ScreenSettings(props: IProps): JSX.Element {
  return (
    <section className="h-full">
      <HeaderView title="Settings" left={<button onClick={() => props.dispatch(Thunk.pullScreen())}>Back</button>} />
      <section style={{ paddingTop: "3.5rem", paddingBottom: "4rem" }}>
        <MenuItem
          name="Account"
          value={props.email}
          shouldShowRightArrow={true}
          onClick={() => props.dispatch(Thunk.pushScreen("account"))}
        />
        <MenuItem
          shouldShowRightArrow={true}
          name="Choose Program"
          value={props.currentProgram}
          onClick={() => {
            props.dispatch({ type: "PushScreen", screen: "programs" });
          }}
        />
        <MenuItem
          name="Timers"
          onClick={() => props.dispatch(Thunk.pushScreen("timers"))}
          shouldShowRightArrow={true}
        />
        <MenuItem
          shouldShowRightArrow={true}
          name="Available Plates"
          onClick={() => props.dispatch(Thunk.pushScreen("plates"))}
        />
        <a href="mailto:info@liftosaur.com" className="block w-full px-6 py-3 text-left border-b border-gray-200">
          Contact Us
        </a>
        <a href="/privacy.html" target="_blank" className="block w-full px-6 py-3 text-left border-b border-gray-200">
          Privacy Policy
        </a>
        <a href="/terms.html" target="_blank" className="block w-full px-6 py-3 text-left border-b border-gray-200">
          Terms &amp; Conditions
        </a>
      </section>
      <FooterView dispatch={props.dispatch} />
    </section>
  );
}
