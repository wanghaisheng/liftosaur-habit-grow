import { h, JSX } from "preact";
import { FooterView } from "./footer";
import { HeaderView } from "./header";
import { IDispatch } from "../ducks/types";
import { MenuItem } from "./menuItem";
import { Thunk } from "../ducks/thunks";
import { MenuItemEditable } from "./menuItemEditable";
import { ISettings } from "../models/settings";
import { lb } from "../utils/lens";
import { IUnit } from "../models/weight";
import { InternalLink } from "../internalLink";
import { IUser } from "../models/user";

interface IProps {
  dispatch: IDispatch;
  user?: IUser;
  currentProgramName?: string;
  settings: ISettings;
}

export function ScreenSettings(props: IProps): JSX.Element {
  return (
    <section className="h-full">
      <HeaderView title="Settings" left={<button onClick={() => props.dispatch(Thunk.pullScreen())}>Back</button>} />
      <section style={{ paddingTop: "3.5rem", paddingBottom: "4rem" }}>
        <MenuItem
          name="Account"
          value={props.user?.email}
          shouldShowRightArrow={true}
          onClick={() => props.dispatch(Thunk.pushScreen("account"))}
        />
        <MenuItem
          shouldShowRightArrow={true}
          name="Choose Program"
          value={props.currentProgramName}
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
        <MenuItemEditable
          type="select"
          name="Units"
          value={props.settings.units}
          values={[
            ["kg", "kg"],
            ["lb", "lb"],
          ]}
          onChange={(newValue) => {
            props.dispatch({
              type: "UpdateSettings",
              lensRecording: lb<ISettings>()
                .p("units")
                .record(newValue as IUnit),
            });
          }}
        />
        <MenuItemEditable
          type="select"
          name="Is Profile Page Public?"
          value={props.settings.isPublicProfile ? "true" : "false"}
          values={[
            ["true", "Yes"],
            ["false", "No"],
          ]}
          nextLine={
            props.user && props.settings.isPublicProfile ? (
              <InternalLink href={`/profile/${props.user.id}`} className="text-xs text-right text-blue-700 underline">
                Open Public Profile Page
              </InternalLink>
            ) : undefined
          }
          onChange={(newValue) => {
            if (props.user != null) {
              props.dispatch({
                type: "UpdateSettings",
                lensRecording: lb<ISettings>()
                  .p("isPublicProfile")
                  .record(newValue === "true"),
              });
            } else {
              alert("You should be logged in to enable public profile");
            }
          }}
        />
        <MenuItemEditable
          type="text"
          name="Nickname"
          value={props.settings.nickname || ""}
          nextLine={<div className="text-xs italic text-right">Used for profile page</div>}
          onChange={(newValue) => {
            props.dispatch({
              type: "UpdateSettings",
              lensRecording: lb<ISettings>()
                .p("nickname")
                .record(newValue ? newValue : undefined),
            });
          }}
        />
        <a href="mailto:info@liftosaur.com" className="block w-full px-6 py-3 text-left border-b border-gray-200">
          Contact Us
        </a>
        <InternalLink href="/privacy.html" className="block w-full px-6 py-3 text-left border-b border-gray-200">
          Privacy Policy
        </InternalLink>
        <InternalLink href="/terms.html" className="block w-full px-6 py-3 text-left border-b border-gray-200">
          Terms &amp; Conditions
        </InternalLink>
        <InternalLink href="/docs/docs.html" className="block w-full px-6 py-3 text-left border-b border-gray-200">
          Documentation
        </InternalLink>
      </section>
      <FooterView dispatch={props.dispatch} />
    </section>
  );
}
