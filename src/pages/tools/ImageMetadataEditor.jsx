import React, { useState } from 'react'
import RelatedTools from '../../components/tools/RelatedTools'
import ToolLayout from '../../components/tools/ToolLayout'
import { useDropzone } from 'react-dropzone'
import { FileImage, Download, Loader2, Save, X, Edit3, Camera, Calendar, User, Copyright } from 'lucide-react'
import { saveAs } from 'file-saver'
import piexif from 'piexifjs'
const features = [
    { title: 'Edit EXIF Tags', desc: 'View and modify hidden metadata like Artist, Copyright, Software, and Date/Time timestamps.', icon: <Edit3 color="var(--primary)" size={24} /> },
    { title: 'Camera Details', desc: 'Update or remove Camera Make, Model, and other technical specifications embedded in your photos.', icon: <Camera color="var(--primary)" size={24} /> },
    { title: 'Private Editing', desc: 'Editing happens entirely in your browser using JavaScript. No files are uploaded to any server.', icon: <Save color="var(--primary)" size={24} /> }
]

const faqs = [
    {
        question: "What is EXIF data?",
        answer: "EXIF (Exchangeable Image File Format) stores details like date taken, camera settings, GPS location, and copyright info inside your image files."
    },
    {
        question: "Is this tool free?",
        answer: "Yes, our Image Metadata Editor is 100% free. You can edit as many photos as you need."
    },
    {
        question: "Is it secure?",
        answer: "Completely. We use client-side processing, so your photos stay on your device and are never sent to a server."
    },
    {
        question: "What formats are supported?",
        answer: "We currently support standard JPG and JPEG files, which are the most common formats for EXIF data."
    }
]

const ImageMetadataEditor = () => {
    const [file, setFile] = useState(null)
    const [exifData, setExifData] = useState({})
    const [isProcessing, setIsProcessing] = useState(false)
    const [imgData, setImgData] = useState(null) // Base64 of image

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            handleSelect(acceptedFiles[0])
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/jpeg': ['.jpg', '.jpeg'] },
        multiple: false
    })

    const handleSelect = (f) => {
        if (!f.type.includes('jpeg') && !f.type.includes('jpg')) {
            alert('Currently only JPG/JPEG images are supported for EXIF editing.')
            return
        }
        setFile(f)
        loadExif(f)
    }

    const loadExif = (f) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            const data = e.target.result
            setImgData(data)
            try {
                const logs = piexif.load(data)
                // Extract simple fields for editing
                const zeroIfObj = (v) => (typeof v === 'object' ? '' : v)

                setExifData({
                    Artist: logs['0th'][piexif.ImageIFD.Artist] || '',
                    Copyright: logs['0th'][piexif.ImageIFD.Copyright] || '',
                    DateTime: logs['0th'][piexif.ImageIFD.DateTime] || '',
                    Software: logs['0th'][piexif.ImageIFD.Software] || '',
                    Make: logs['0th'][piexif.ImageIFD.Make] || '',
                    Model: logs['0th'][piexif.ImageIFD.Model] || '',
                })
            } catch (err) {
                console.error(err)
                alert('No EXIF data found or invalid format. New data will be created.')
                setExifData({ Artist: '', Copyright: '', DateTime: '', Software: '', Make: '', Model: '' })
            }
        }
        reader.readAsDataURL(f)
    }

    const saveExif = () => {
        if (!imgData) return
        setIsProcessing(true)
        try {
            const logs = piexif.load(imgData) // Load existing to keep other tags

            logs['0th'][piexif.ImageIFD.Artist] = exifData.Artist
            logs['0th'][piexif.ImageIFD.Copyright] = exifData.Copyright
            logs['0th'][piexif.ImageIFD.DateTime] = exifData.DateTime
            logs['0th'][piexif.ImageIFD.Software] = exifData.Software
            logs['0th'][piexif.ImageIFD.Make] = exifData.Make
            logs['0th'][piexif.ImageIFD.Model] = exifData.Model

            const exifStr = piexif.dump(logs)
            const newJpeg = piexif.insert(exifStr, imgData)

            // Convert base64 to blob
            const byteString = atob(newJpeg.split(',')[1])
            const ab = new ArrayBuffer(byteString.length)
            const ia = new Uint8Array(ab)
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i)
            }
            const blob = new Blob([ab], { type: 'image/jpeg' })
            saveAs(blob, `edited-${file.name}`)

        } catch (error) {
            console.error(error)
            alert('Error saving EXIF.')
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <ToolLayout
            title="Image Metadata Editor"
            description="View and Edit EXIF data (Artist, Camera, Date) of JPG images."
            seoTitle="Image Metadata Editor - Edit EXIF Online"
            seoDescription="Edit photo metadata online. Change Artist, Copyright, Camera Model, and Date taken for JPG images. Free and secure client-side tool."
            faqs={faqs}
        >
            <div className="tool-workspace" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {!file ? (
                    <div
                        id="image-metadata-dropzone"
                        {...getRootProps()}
                        className="tool-upload-area"
                        style={{
                            border: '2px dashed var(--border)',
                            borderRadius: '1rem',
                            padding: '4rem 2rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            background: isDragActive ? 'var(--secondary)' : 'white',
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                        }}
                    >
                        <input {...getInputProps()} />
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: '#eff6ff',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            color: '#3b82f6'
                        }}>
                            <Edit3 size={40} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '600', color: '#1e293b' }}>
                            {isDragActive ? 'Drop JPG to Edit...' : 'Drag & Drop JPG to Edit EXIF'}
                        </h3>
                        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
                            or click to browse files
                        </p>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#94a3b8' }}>
                            Supports standard JPG/JPEG files
                        </p>
                    </div>
                ) : (
                    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <p style={{ fontWeight: 'bold' }}>{file.name}</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                    <User size={16} /> Artist / Author
                                </label>
                                <input
                                    id="metadata-artist"
                                    type="text"
                                    value={exifData.Artist}
                                    onChange={e => setExifData({ ...exifData, Artist: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                    <Copyright size={16} /> Copyright
                                </label>
                                <input
                                    id="metadata-copyright"
                                    type="text"
                                    value={exifData.Copyright}
                                    onChange={e => setExifData({ ...exifData, Copyright: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                    <Calendar size={16} /> Date & Time
                                </label>
                                <input
                                    id="metadata-datetime"
                                    type="text"
                                    value={exifData.DateTime}
                                    placeholder="YYYY:MM:DD HH:MM:SS"
                                    onChange={e => setExifData({ ...exifData, DateTime: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                    <Edit3 size={16} /> Software
                                </label>
                                <input
                                    id="metadata-software"
                                    type="text"
                                    value={exifData.Software}
                                    onChange={e => setExifData({ ...exifData, Software: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                    <Camera size={16} /> Camera Make
                                </label>
                                <input
                                    id="metadata-make"
                                    type="text"
                                    value={exifData.Make}
                                    onChange={e => setExifData({ ...exifData, Make: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                    <Camera size={16} /> Camera Model
                                </label>
                                <input
                                    id="metadata-model"
                                    type="text"
                                    value={exifData.Model}
                                    onChange={e => setExifData({ ...exifData, Model: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                            </div>
                        </div>

                        <button
                            id="metadata-save-btn"
                            onClick={saveExif}
                            disabled={isProcessing}
                            className="tool-btn-primary"
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                background: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                cursor: isProcessing ? 'wait' : 'pointer',
                                fontWeight: 'bold',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                                fontSize: '1.1rem'
                            }}
                        >
                            {isProcessing ? <Loader2 className="spin" size={20} /> : <Save size={20} />}
                            {isProcessing ? 'Saving...' : 'Save New Metadata'}
                        </button>

                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            <button
                                id="metadata-cancel-btn"
                                onClick={() => setFile(null)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', textDecoration: 'underline', cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                <div className="tool-content" style={{ marginTop: '4rem' }}>

                    <div className="tool-content" style={{ marginTop: '4rem' }}>
                        <RelatedTools />
                        <div className="about-section" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About Image Metadata Editor</h2>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                Every time you take a photo, your camera stores hidden information called EXIF data. Our <strong>Image Metadata Editor</strong> lets you view and modify this data directly in your browser.
                            </p>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                You can easily update the <strong>Artist</strong> name, add <strong>Copyright</strong> notices, change the <strong>Date/Time</strong>, or modify <strong>Camera Model</strong> details. This is essential for photographers who want to attribute their  work correctly or remove sensitive information before sharing.
                            </p>
                            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                                We value your privacy. Unlike other tools, we process your images legally on your device using JavaScript. Your photos are never uploaded to any cloud server.
                            </p>
                        </div>
                        <div className="features-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                            {features.map((feature, index) => (
                                <div key={index} className="tool-feature-block" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                    <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                        {feature.icon}
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                                </div>
                            ))}</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    )
}



export default ImageMetadataEditor
