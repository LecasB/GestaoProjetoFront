import React, { useEffect, useState } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';

export default function AdvanceDemo({ images = [] }) {
    const [preloadedFiles, setPreloadedFiles] = useState([]);
    const [totalSize, setTotalSize] = useState(0);

    useEffect(() => {
        const preload = async () => {
            const files = await Promise.all(images.map(async (url, index) => {
                const response = await fetch(url);
                const blob = await response.blob();
                return {
                    name: `image-${index}.jpg`,
                    objectURL: url,
                    size: blob.size,
                    type: blob.type
                };
            }));
            setPreloadedFiles(files);
            setTotalSize(files.reduce((acc, file) => acc + file.size, 0));
        };

        if (images.length > 0) preload();
    }, [images]);

    const handleRemove = (fileName) => {
        setPreloadedFiles(prev => {
            const updated = prev.filter(f => f.name !== fileName);
            setTotalSize(updated.reduce((acc, f) => acc + f.size, 0));
            return updated;
        });
    };

    return (
        <div className="card">
            <FileUpload
                name="demo[]"
                url="/api/upload"
                multiple
                accept="image/*"
                maxFileSize={1000000}
                emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
            />

            {/* Preloaded files display */}
            {preloadedFiles.length > 0 && (
                <div className="mt-4">
                    <h5>Preloaded Images</h5>
                    {preloadedFiles.map(file => (
                        <div key={file.name} className="flex align-items-center my-2">
                            <img src={file.objectURL} alt={file.name} width={100} className="mr-3" />
                            <div className="flex flex-column mr-3">
                                <span>{file.name}</span>
                                <small>{Math.round(file.size / 1024)} KB</small>
                            </div>
                            <Tag value="preloaded" severity="info" className="mr-2" />
                            <Button
                                icon="pi pi-times"
                                className="p-button-danger p-button-rounded p-button-outlined"
                                onClick={() => handleRemove(file.name)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
