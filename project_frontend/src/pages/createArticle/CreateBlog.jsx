import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import app from "../../firebase";

import { createBlogPost } from "../../services/blog";
import { Mycontext } from "../../store/CreateContext";
import { MainLayout } from "../../components"

export const CreateBlog = () => {
  const { isAuth, userId, userName } = useContext(Mycontext);

  console.log("inside CreateBlog");
  console.log("isAuth", isAuth);
  console.log("userId", userId);

  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ title, body, user, imageUrl, userName }) => {
      return createBlogPost({ title, body, user, imageUrl, userName });
    },
    onSuccess: () => {
      toast.success("Blog post created successfully!");
      navigate("/blogs");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const uploadImage = async (file) => {
    const storage = getStorage(app);
    const imageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(imageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        toast.success("Upload is " + progress + "% done");
      },
      (error) => {
        console.log("Error during upload:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const submitHandler = async (data) => {
    const { title, body } = data;
    const user = userId;
    console.log("imageUrl", imageUrl);
    mutate({ title, body, user, imageUrl, userName });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      title: "",
      body: "",
    },
    mode: "onChange",
  });


  return (
    <MainLayout>
      <div className="container mx-auto max-w-3xl p-5 mt-10 mb-10">
        <h1 className="text-2xl font-medium mb-4">Create a New Blog Post</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-4">
            <label className="block text-slate-800 mb-2">Title</label>
            <input
              type="text"
              {...register("title", {
                required: {
                  value: true,
                  message: "Title is required",
                },
                minLength: {
                  value: 5,
                  message: "Title length must be at least 5 characters",
                },
              })}
              placeholder="Enter Title"
              className={`w-full p-2 border rounded ${errors.title ? "border-red-500" : "border-[#c3cad9]"
                }`}
            />
            {errors.title?.message && (
              <p className="text-red-500 text-xs mt-1 ">
                {errors.title?.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-slate-800 mb-2">Body</label>
            <textarea
              {...register("body", {
                required: {
                  value: true,
                  message: "Body is required",
                },
                minLength: {
                  value: 20,
                  message: "Body length must be at least 20 characters",
                },
              })}
              placeholder="Enter Body"
              className={`w-full p-2 border rounded ${errors.body ? "border-red-500" : "border-[#c3cad9]"
                }`}
            ></textarea>
            {errors.body?.message && (
              <p className="text-red-500 text-xs mt-1 ">
                {errors.body?.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-slate-800 mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded border-[#c3cad9]"
            />
          </div>

          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="disabled:opacity-70 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </form>
      </div>
    </MainLayout>
  );
};
