import { setAppState } from "@/stores/features/appStateSlice";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = {
  state?: string,
  children: ReactNode;
};

const PageWrapper = (props: Props) => {
  const dispatch = useDispatch();
  useEffect(() => { 
    if (props.state) {
      dispatch(setAppState(props.state));
    }
  }, [dispatch, props]);

  return (
    <>{props.children}</>
  );
};

export default PageWrapper;