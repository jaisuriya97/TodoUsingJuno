import { useContext, useEffect, useState } from "react";
import { listDocs, setDoc, deleteDoc } from "@junobuild/core"; // Import the deleteDoc function
import { AuthContext } from "./Auth";

export const Table = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.addEventListener("reload", list);

    return () => {
      window.removeEventListener("reload", list);
    };
  }, []);

  const list = async () => {
    try {
      const { items } = await listDocs({
        collection: "notes",
      });
      setItems(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if ([undefined, null].includes(user)) {
      setItems([]);
      return;
    }

    (async () => await list())();
  }, [user]);

  const [buttonLoading, setButtonLoading] = useState({});

  const handleToggleComplete = async (key) => {
    setButtonLoading((prevButtonLoading) => ({
      ...prevButtonLoading,
      [key]: true,
    }));

    const itemToUpdate = items.find((item) => item.key === key);

    if (!itemToUpdate) {
      return;
    }

    itemToUpdate.data.complete = !itemToUpdate.data.complete;

    try {
      await setDoc({
        collection: "notes",
        doc: itemToUpdate,
      });

      await list();
    } catch (error) {
      console.error("Error updating item:", error);
    } finally {
      setButtonLoading((prevButtonLoading) => ({
        ...prevButtonLoading,
        [key]: false,
      }));
    }
  };

  const handleDeleteItem = async (key) => {
    setButtonLoading((prevButtonLoading) => ({
      ...prevButtonLoading,
      [key]: true,
    }));

    try {
      // Find the item in the items array by its key
      const itemToDelete = items.find((item) => item.key === key);

      if (!itemToDelete) {
        return;
      }

      // Use deleteDoc to remove the item
      await deleteDoc({
        collection: "notes",
        doc: itemToDelete,
      });

      // Refresh the list
      await list();
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setButtonLoading((prevButtonLoading) => ({
        ...prevButtonLoading,
        [key]: false,
      }));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200 mt-8">
      <header className="px-5 py-4 border-b border-gray-100"></header>
      <div className="p-3">
        {loading ? (
          <span className="material-symbols-outlined">hourglass_bottom</span>
        ) : (
          <div className="overflow-x-auto">
            {items.map((item, index) => {
              const { key, data: { text, complete, url } } = item;
              return (
                <div key={key} className="flex items-center gap-6 px-2.5 py-1.5">
                  <span className="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max">
                    {index + 1}
                  </span>
                  <div className={`line-clamp-3 text-left grow ${complete ? "line-through" : ""}`}>
                    {text}
                  </div>
                  <button onClick={() => handleToggleComplete(key)} disabled={buttonLoading[key]}>
                    {buttonLoading[key] ? (
                      <span className="material-symbols-outlined">hourglass_bottom</span>
                    ) : (
                      complete ? (
                        <span className="material-symbols-outlined">cancel</span>
                      ) : (
                        <span className="material-symbols-outlined">task_alt</span>
                      )
                    )}
                  </button>
                  <button onClick={() => handleDeleteItem(key)} disabled={buttonLoading[key]}>
                    {buttonLoading[key] ? (
                      <span className="material-symbols-outlined">hourglass_bottom</span>
                    ) : (
                      <span className="material-symbols-outlined">delete</span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
