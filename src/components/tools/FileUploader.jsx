import React from 'react'
import { useDropzone } from 'react-dropzone'
import { FileText, Upload } from 'lucide-react'

const FileUploader = ({
    onFileSelect,
    accept,
    multiple = false,
    icon: Icon = FileText,
    label = "Drag & Drop files here",
    subLabel = "or click to select file",
    ...props
}) => {
    const onDrop = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            onFileSelect(multiple ? acceptedFiles : acceptedFiles[0])
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        multiple
    })

    const inputProps = getInputProps()
    if (props.id) inputProps.id = props.id

    return (
        <div
            className="tool-upload-area"
            {...getRootProps()}
            style={{
                border: '2px dashed var(--border)',
                borderRadius: '1rem',
                padding: '4rem 2rem',
                textAlign: 'center',
                cursor: 'pointer',
                background: isDragActive ? 'var(--secondary)' : 'white',
                minHeight: '300px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease'
            }}
        >
            <input {...inputProps} />
            <div style={{
                width: '64px', height: '64px',
                background: '#fee2e2',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: '#dc2626'
            }}>
                <Icon size={32} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {label}
            </h3>
            <p style={{ color: '#64748b' }}>{subLabel}</p>
        </div>
    )
}

export default FileUploader
