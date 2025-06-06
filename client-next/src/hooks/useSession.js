import { SESSION_QUERY } from "@/actions/authActions";
import { useQuery } from "@apollo/client";

const useSession = () => {
  const { data, loading, error } = useQuery(SESSION_QUERY);

  return { user: data?.session ?? null, loading, error };
};

export default useSession;
