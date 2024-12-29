import React, { useState, ChangeEvent, useEffect } from "react";
import { storage } from "../config/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { useAuth } from "../contexts/AuthContext";
import {
  Terminal,
  Upload,
  LogOut,
  Check,
  AlertTriangle,
  Download,
  Folder,
  Trash2,
} from "lucide-react";

const Dashboard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [userFiles, setUserFiles] = useState<
    Array<{ name: string; url: string }>
  >([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, logout } = useAuth();

  // Fetch user's files on component mount
  useEffect(() => {
    if (currentUser) {
      fetchUserFiles();
    }
  }, [currentUser]);

  const fetchUserFiles = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      const storageRef = ref(storage, `files/${currentUser.uid}`);
      const filesList = await listAll(storageRef);

      const filesData = await Promise.all(
        filesList.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return {
            name: item.name,
            url: url,
          };
        })
      );

      setUserFiles(filesData);
    } catch (error) {
      console.error("Error fetching files:", error);
      setUploadError("Failed to fetch files");
    } finally {
      setLoading(false);
    }
  };

  // Simulate progress during upload
  useEffect(() => {
    if (uploading && uploadProgress < 96) {
      const timer = setTimeout(() => {
        setUploadProgress((prev) => prev + Math.random() * 15);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [uploading, uploadProgress]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUploadSuccess(false);
    setUploadError("");
    setUploadProgress(0);
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !currentUser) return;

    try {
      setUploading(true);
      setUploadProgress(0);

      const storageRef = ref(storage, `files/${currentUser.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      setUploadProgress(100);
      setUploadSuccess(true);
      setFile(null);

      // Refresh the file list
      await fetchUserFiles();

      // Reset success message after 3 seconds
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      setUploadError("Upload failed. System compromised.");
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteFile = async (fileName: string) => {
    if (!currentUser) return;

    try {
      const fileRef = ref(storage, `files/${currentUser.uid}/${fileName}`);
      await deleteObject(fileRef);
      await fetchUserFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
      setUploadError("Failed to delete file");
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-500 p-6 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="border border-green-500 p-6 rounded-lg shadow-lg shadow-green-500/20">
          <div className="flex items-center mb-6">
            <Terminal className="w-6 h-6 mr-2" />
            <h1 className="text-2xl font-bold tracking-wider">
              SECURE_UPLOADER.exe
            </h1>
          </div>

          <div className="mb-8 animate-pulse">
            <p className="text-xs mb-1">USER: {currentUser?.email}</p>
            <p className="text-xs">STATUS: CONNECTED</p>
          </div>

          <div className="border border-green-500/50 p-4 mb-6 rounded">
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm mb-4 file:mr-4 file:py-2 file:px-4 
                file:border-0 file:bg-green-500/20 file:text-green-500
                hover:file:bg-green-500/30 file:cursor-pointer file:rounded"
            />

            {uploadProgress > 0 && (
              <div className="mb-4">
                <div className="h-2 w-full bg-green-500/20 rounded overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>
                    Progress: {Math.min(100, Math.round(uploadProgress))}%
                  </span>
                  <span>{file?.name}</span>
                </div>
              </div>
            )}

            {uploadSuccess && (
              <div className="flex items-center text-sm mb-4 bg-green-500/20 p-2 rounded">
                <Check className="w-4 h-4 mr-2" />
                Upload successful. Connection secure.
              </div>
            )}

            {uploadError && (
              <div className="flex items-center text-sm mb-4 bg-red-500/20 p-2 rounded text-red-500">
                <AlertTriangle className="w-4 h-4 mr-2" />
                {uploadError}
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="flex items-center justify-center w-full bg-green-500/20 
                hover:bg-green-500/30 text-green-500 px-4 py-2 rounded
                disabled:opacity-50 disabled:cursor-not-allowed transition-all
                border border-green-500/50 hover:border-green-500"
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? "UPLOADING..." : "INITIATE_UPLOAD"}
            </button>
          </div>

          {/* Files List Section */}
          <div className="border border-green-500/50 p-4 mb-6 rounded">
            <div className="flex items-center mb-4">
              <Folder className="w-4 h-4 mr-2" />
              <h2 className="text-lg">STORED_FILES</h2>
            </div>

            {loading ? (
              <div className="text-center py-4 animate-pulse">
                Loading files...
              </div>
            ) : userFiles.length === 0 ? (
              <div className="text-center py-4 text-green-500/50">
                No files found in secure storage
              </div>
            ) : (
              <div className="space-y-2">
                {userFiles.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between p-2 bg-green-500/10 rounded hover:bg-green-500/20"
                  >
                    <span className="text-sm truncate flex-1 mr-4">
                      {file.name}
                    </span>
                    <div className="flex items-center space-x-2">
                      <a
                        href={file.url}
                        download
                        className="p-1 hover:bg-green-500/20 rounded transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleDeleteFile(file.name)}
                        className="p-1 hover:bg-red-500/20 rounded transition-colors text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={logout}
            className="flex items-center justify-center w-full bg-red-500/20 
              hover:bg-red-500/30 text-red-500 px-4 py-2 rounded
              border border-red-500/50 hover:border-red-500 transition-all"
          >
            <LogOut className="w-4 h-4 mr-2" />
            TERMINATE_SESSION
          </button>
        </div>

        <div className="mt-4 text-xs text-green-500/50 animate-pulse">
          System ready. Awaiting command input...
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
