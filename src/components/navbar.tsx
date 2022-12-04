import { h, JSX, ComponentChildren, Fragment } from "preact";
import { Thunk } from "../ducks/thunks";
import { IDispatch } from "../ducks/types";
import { IScreen } from "../models/screen";
import { IconBack } from "./icons/iconBack";
import { IconHelp } from "./icons/iconHelp";
import { useEffect, useState } from "preact/hooks";
import { ILoading, IState, updateState } from "../models/state";
import { IconSpinner } from "./icons/iconSpinner";
import { IconClose } from "./icons/iconClose";
import { lb } from "lens-shmens";
import { Modal } from "./modal";
import { Link } from "./link";

interface INavbarCenterProps {
  title: ComponentChildren;
  subtitle?: ComponentChildren;
  onTitleClick?: () => void;
}

interface INavbarProps extends INavbarCenterProps {
  dispatch: IDispatch;
  rightButtons?: JSX.Element[];
  onBack?: () => boolean;
  helpContent?: ComponentChildren;
  onHelpClick?: () => void;
  loading: ILoading;
  screenStack: IScreen[];
}

export const NavbarView = (props: INavbarProps): JSX.Element => {
  const [isScrolled, setIsScrolled] = useState(false);
  const showBackButton = props.screenStack.length > 1;

  useEffect(() => {
    const onScroll = (): void => {
      if (window.pageYOffset > 0 && !isScrolled) {
        setIsScrolled(true);
      } else if (window.pageYOffset === 0 && isScrolled) {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  let className = "fixed top-0 left-0 z-20 flex items-center justify-center w-full px-2 text-center bg-white";
  if (isScrolled) {
    className += " has-shadow";
  }

  const loadingItems = props.loading.items;
  const loadingKeys = Object.keys(loadingItems).filter((k) => loadingItems[k]);
  const error = props.loading.error;

  const isLoading = Object.keys(loadingKeys).length > 0;
  const numberOfLeftButtons = [showBackButton ? 1 : 0, isLoading ? 1 : 0].reduce((a, b) => a + b);
  const numberOfRightButtons = (props.rightButtons?.length ?? 0) + (props.onHelpClick ? 1 : 0);
  const numberOfButtons = Math.max(numberOfLeftButtons, numberOfRightButtons);
  const [shouldShowModalHelp, setShouldShowModalHelp] = useState(false);

  return (
    <>
      <div className={className} style={{ transition: "box-shadow 0.2s ease-in-out" }}>
        <div className="flex items-center justify-start" style={{ minWidth: numberOfButtons * 40 }}>
          {showBackButton ? (
            <button
              className="p-2"
              onClick={() => {
                if (!props.onBack || props.onBack()) {
                  props.dispatch(Thunk.pullScreen());
                }
              }}
            >
              <IconBack />
            </button>
          ) : undefined}
          {isLoading ? (
            <span className="pl-2">
              <IconSpinner width={20} height={20} />
            </span>
          ) : null}
        </div>
        <NavbarCenterView {...props} />
        <div className="flex items-center justify-end" style={{ minWidth: numberOfButtons * 40 }}>
          {props.rightButtons}
          {(props.onHelpClick || props.helpContent) && (
            <button className="p-2" onClick={props.onHelpClick || (() => setShouldShowModalHelp(true))}>
              <IconHelp />
            </button>
          )}
        </div>
        {error && (
          <div
            className="absolute left-0 flex justify-center w-full align-middle pointer-events-none"
            style={{ bottom: "-1rem" }}
          >
            <div
              className="flex pl-4 rounded-full pointer-events-auto border-redv2-main text-redv2-main"
              style={{ background: "#FFECEC", boxShadow: "0 0 4px rgba(255, 27, 27, 0.38)" }}
            >
              <div className="font-bold" style={{ paddingTop: "1px" }}>
                {error}
              </div>
              <button
                className="px-3"
                onClick={() => updateState(props.dispatch, [lb<IState>().p("loading").p("error").record(undefined)])}
              >
                <IconClose size={16} color="#E53E3E" />
              </button>
            </div>
          </div>
        )}
      </div>
      {props.helpContent && (
        <Modal
          isHidden={!shouldShowModalHelp}
          onClose={() => setShouldShowModalHelp(false)}
          shouldShowClose={true}
          isFullWidth
        >
          {props.helpContent}
          <div className="w-full h-0 mt-4 mb-2 border-b border-grayv2-200" />
          <p className="text-sm text-grayv2-main">
            If you still have questions, or if you encountered a bug, have a feature idea, or just want to share some
            feedback - don't hesitate to <Link href="mailto:info@liftosaur.com">contact us</Link>!
          </p>
        </Modal>
      )}
    </>
  );
};

export function NavbarCenterView(props: INavbarCenterProps): JSX.Element {
  if (props.subtitle != null) {
    return (
      <div className="flex-1" onClick={props.onTitleClick}>
        <div className="pt-2 text-sm font-semibold">{props.title}</div>
        <div className="pb-2 text-sm font-semibold text-orangev2">{props.subtitle}</div>
      </div>
    );
  } else {
    return (
      <div className="flex-1 py-2" onClick={props.onTitleClick}>
        <div className="py-2 text-lg font-semibold whitespace-no-wrap">{props.title}</div>
      </div>
    );
  }
}
