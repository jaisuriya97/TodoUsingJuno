import { useContext, useEffect, useState } from "react";
import { setDoc, uploadFile } from "@junobuild/core";
import { AuthContext } from "./Auth";
import { nanoid } from "nanoid";

export const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  const [inputText, setInputText] = useState("");
  const [valid, setValid] = useState(false);
  const [progress, setProgress] = useState(false);
  const [file, setFile] = useState();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    setValid(inputText !== "" && user !== undefined && user !== null);
  }, [showModal, inputText, user]);

  const reload = () => {
    let event = new Event("reload");
    window.dispatchEvent(event);
  };

  const add = async () => {
    if ([null, undefined].includes(user)) {
      return;
    }

    setProgress(true);

    try {
      let url;

      if (file !== undefined) {
        const filename = `${user.key}-${file.name}`;

        const { downloadUrl } = await uploadFile({
          collection: "images",
          data: file,
          filename,
        });

        url = downloadUrl;
      }

      const key = nanoid();

      await setDoc({
        collection: "notes",
        doc: {
          key,
          data: {
            text: inputText,
            complete: false,
          },
        },
      });

      setShowModal(false);

      reload();
    } catch (err) {
      console.error(err);
    } finally {
      setProgress(false);
    }
  };

  const handleResetInput = () => {
    setInputText("");
  };

  return (
    <>
      <input
        type="text"
        name=""
        className="
          mt-4
          form-control
          w-60
          px-3
          py-1.5
          text-xl
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none
          resize-none"
        id=""
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        value={inputText}
        disabled={progress}
      />
      <button
        type="reset"
        onClick={handleResetInput}
        disabled={!valid || progress}
        className="cursor-pointer  bg-clip-padding m-3 hover:bg-red-600 rounded bg-clip-padding border border-solid border-red-500 p-1 content-center"
      >
        <span className="material-symbols-outlined  w-20">
          restart_alt
        </span>
      </button>
      <button
        className="cursor-pointer rounded bg-clip-padding border border-solid border-green-500 p-1 content-center hover:bg-green-600"
        type="button"
        onClick={add}
        disabled={!valid || progress}
      >
        {progress ? (
          <span className="material-symbols-outlined w-20">
          hourglass_bottom
          </span>
        ) : (
          <span className="material-symbols-outlined w-20">add</span>
        )}
      </button>
    </>
  );
};
