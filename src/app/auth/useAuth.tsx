import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { Context } from "@/app/context/Context";
import { auth } from "@/firebase/firebase";
import { getDocumentById } from "@/firebase/firestoreUtils";

const useAuth = () => {
  const { user, userLogin } = Context();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const fetchUser = async (uid: string) => {
    try {
      const userDoc = await getDocumentById("users", uid);
      if (userDoc) {
        userLogin(userDoc);
        return userDoc; // Return the userDoc for further checks
      } else {
        userLogin(null);
        return null; // Return null if no user document is found
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      userLogin(null);
      return null; // Handle errors by returning null
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userDoc: any = await fetchUser(currentUser.uid);
        if (userDoc) {
          // Now we have the latest user document
          setIsAuthorized(userDoc.is_admin); // Set isAuthorized based on admin status
          router.replace(userDoc.is_admin ? "/admin" : "/admin/unauthorized");
        } else {
          router.push("/admin/signup");
        }
      } else {
        router.push("/admin/signup");
      }
      setIsLoading(false);
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, [router]); // Only depend on router for the effect

  return { isLoading, isAuthorized }; // Return loading and authorization states
};

export default useAuth;
