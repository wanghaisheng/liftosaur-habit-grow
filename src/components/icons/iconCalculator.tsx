import { h, JSX } from "preact";

interface IProps {
  color?: string;
  size?: number;
}

export function IconCalculator(props: IProps): JSX.Element {
  const color = props.color || "#171718";
  const size = props.size ?? 20;
  return (
    <svg width={size} height={Math.ceil(size * 1.3)} viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 7.12593C0 3.19038 3.09635 0 6.91592 0H33.0841C36.9037 0 40 3.19038 40 7.12593V44.874C40 48.8096 36.9037 52 33.0841 52H6.91592C3.09635 52 0 48.8096 0 44.874V7.12593ZM6.91592 3.46667C4.95454 3.46667 3.36448 5.10497 3.36448 7.12593V44.874C3.36448 46.895 4.95454 48.5333 6.91592 48.5333H33.0841C35.0455 48.5333 36.6355 46.895 36.6355 44.874V7.12593C36.6355 5.10498 35.0455 3.46667 33.0841 3.46667H6.91592ZM10.4672 12.5185C10.4672 11.5612 11.2204 10.7851 12.1495 10.7851H27.8504C28.7796 10.7851 29.5326 11.5612 29.5326 12.5185C29.5326 13.4759 28.7796 14.2518 27.8504 14.2518H12.1495C11.2204 14.2518 10.4672 13.4759 10.4672 12.5185ZM10.4672 23.3037C10.4672 22.3464 11.2204 21.5704 12.1495 21.5704H12.1757C13.1048 21.5704 13.858 22.3464 13.858 23.3037C13.858 24.261 13.1048 25.0371 12.1757 25.0371H12.1495C11.2204 25.0371 10.4672 24.261 10.4672 23.3037ZM18.3177 23.3037C18.3177 22.3464 19.0709 21.5704 19.9999 21.5704H20.0262C20.9552 21.5704 21.7084 22.3464 21.7084 23.3037C21.7084 24.261 20.9552 25.0371 20.0262 25.0371H19.9999C19.0709 25.0371 18.3177 24.261 18.3177 23.3037ZM26.1682 23.3037C26.1682 22.3464 26.9214 21.5704 27.8504 21.5704H27.8766C28.8057 21.5704 29.5589 22.3464 29.5589 23.3037C29.5589 24.261 28.8057 25.0371 27.8766 25.0371H27.8504C26.9214 25.0371 26.1682 24.261 26.1682 23.3037ZM10.4672 31.3926C10.4672 30.4353 11.2204 29.6593 12.1495 29.6593H12.1757C13.1048 29.6593 13.858 30.4353 13.858 31.3926C13.858 32.3499 13.1048 33.126 12.1757 33.126H12.1495C11.2204 33.126 10.4672 32.3499 10.4672 31.3926ZM18.3177 31.3926C18.3177 30.4353 19.0709 29.6593 19.9999 29.6593H20.0262C20.9552 29.6593 21.7084 30.4353 21.7084 31.3926C21.7084 32.3499 20.9552 33.126 20.0262 33.126H19.9999C19.0709 33.126 18.3177 32.3499 18.3177 31.3926ZM27.8504 29.6593C28.7796 29.6593 29.5326 30.4353 29.5326 31.3926V39.4815C29.5326 40.4388 28.7796 41.2149 27.8504 41.2149C26.9214 41.2149 26.1682 40.4388 26.1682 39.4815V31.3926C26.1682 30.4353 26.9214 29.6593 27.8504 29.6593ZM10.4672 39.4815C10.4672 38.5241 11.2204 37.7482 12.1495 37.7482H12.1757C13.1048 37.7482 13.858 38.5241 13.858 39.4815C13.858 40.4388 13.1048 41.2149 12.1757 41.2149H12.1495C11.2204 41.2149 10.4672 40.4388 10.4672 39.4815ZM18.3177 39.4815C18.3177 38.5241 19.0709 37.7482 19.9999 37.7482H20.0262C20.9552 37.7482 21.7084 38.5241 21.7084 39.4815C21.7084 40.4388 20.9552 41.2149 20.0262 41.2149H19.9999C19.0709 41.2149 18.3177 40.4388 18.3177 39.4815Z"
        fill={color}
      />
    </svg>
  );
}