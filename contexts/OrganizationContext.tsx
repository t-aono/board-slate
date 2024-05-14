import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { Action, SectionsDispatchContext } from "./SectionsContext";

export interface IOrganization {
  id: string;
  name: string;
  admin_uid?: string;
  member_uids?: string[];
}

const initialState = {
  id: "",
  name: "",
  admin_uid: "",
  member_uids: [],
};

export const OrganizationContext = createContext<IOrganization>(initialState);

export const OrganizationProvider = ({ children }: { children: ReactNode }) => {
  const [organization, setOrganization] = useState<IOrganization>(initialState);
  const { user } = useContext(AuthContext);
  const dispatch = useContext(SectionsDispatchContext);

  useEffect(() => {
    if (user?.uid) {
      (async () => {
        const { data } = await axios.get(`/api/organization/${user?.uid}`);
        console.log("$ get organization", data);
        setOrganization(data);
      })();
    }
  }, [user]);

  const organizationId = organization.id;
  useEffect(() => {
    if (organizationId) {
      (async () => {
        const { data } = await axios.get(`/api/section/${organizationId}`);
        console.log("$ get sections", data);
        if (dispatch) {
          dispatch({ type: Action.SET, values: data });
        }
      })();
    }
  }, [organizationId]);

  return <OrganizationContext.Provider value={organization}>{children}</OrganizationContext.Provider>;
};
