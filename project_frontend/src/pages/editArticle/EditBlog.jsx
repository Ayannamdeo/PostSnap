import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../../firebase';

import { MainLayout } from '../../components';
import { getSingleBlogPost, updateBlogPost } from '../../services/blog';
import { deleteBlogPost } from '../../services/blog';

export const EditBlog = () => {
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploaded, setimageUploaded] = useState(false);
  const navigate = useNavigate();

  // const [dummy, setdummy] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors, isValid }, } = useForm({
    defaultValues: { title: "", body: "", },
    mode: "onChange",
  });

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getSingleBlogPost({ id }),
    queryKey: ["posts", id],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ title, body, imageUrl }) => {
      return updateBlogPost({ id, title, body, imageUrl });
    },
    onSuccess: () => {
      toast.success("Blog post updated successfully!");
      navigate("/blogs");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });


  const deleteMutation = useMutation({
    mutationFn: () => deleteBlogPost({ id }),
    onSuccess: () => {
      toast.success("Blog post updated successfully!");
      navigate("/myposts");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const uploadImage = async (file) => {
    const storage = getStorage(app);
    const imageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(imageRef, file);

    // setIsUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        toast.success("Upload is " + progress + "% done");
      },
      (error) => {
        console.log("Error during upload:", error);
        setimageUploaded(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setimageUploaded(true);
          console.log("File available at", downloadURL);
          console.log(imageUploaded);
        });
      }
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("body", data.body);
      setImageUrl(data.imageUrl);
    }
  }, [data, setValue]);

  const submitHandler = (data) => {
    const { title, body } = data;
    console.log("imageUrl", imageUrl);
    updateMutation.mutate({ title, body, imageUrl });
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <MainLayout>
      <div className="container mx-auto max-w-3xl p-5 mt-10 mb-10">
        <h1 className="text-2xl font-medium mb-4">Edit Blog Post</h1>
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
            disabled={!isValid}
            // disabled={!imageUploaded || !isValid}
            className="disabled:opacity-70 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update Content
          </button>
          <button disabled={!imageUploaded}
            className="  mx-4 disabled:opacity-70 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >Update Image
          </button>


          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded ml-4"
          >
            Delete
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

