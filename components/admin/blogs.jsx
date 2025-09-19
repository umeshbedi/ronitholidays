import { db } from '@/firebase';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Input, Modal, Select, Space, message } from 'antd'
import React, { useEffect, useState } from 'react'
import AddBlogsDetails from './AddBlogDetails';

const blogsdb = db.collection("blogs")

export default function Blogs() {
    const [open, setOpen] = useState(false);
    const [BlogsName, setBlogsName] = useState("")
    const [selectedBlogs, setSelectedBlogs] = useState(null)
    const [BlogsItem, setBlogsItem] = useState([])
    const [sfD, setSfD] = useState(null)

    const [msg, showMsg] = message.useMessage()

    useEffect(() => {
        blogsdb.onSnapshot((snap) => {
            const tempBlogs = []
            snap.forEach((sndata => {
                tempBlogs.push({ id: sndata.id, ...sndata.data() })
            }))
            setBlogsItem(tempBlogs)
        })
    }, [])

    function addNewBlogs() {
        if (BlogsName != "") {
            blogsdb.add({
                headerImage: "",
                image: "",
                name: BlogsName,
                about: "",
                slug: `/blogs/${BlogsName.split(" ").join("-")}`,
                metaTitle: "",
                metaDescription: "",
                metaKeywords: ""
            }).then(() => { msg.success("Added new Blogs Succussfully!"); setOpen(false) })
            // console.log(BlogsName)
        } else { msg.error("Please enter Blogs name") }
    }

    function deleteBlog() {
        if (confirm("are you sure want to delete??")) {
            blogsdb.doc(`${selectedBlogs}`).delete().then(() => msg.success("deleted"))
            setSelectedBlogs(null)
        } else { console.log("denied") }
    }

    useEffect(() => {
        if (selectedBlogs != null) {
            const result = BlogsItem.find(f => f.id == selectedBlogs)
            setSfD(result)
        }
    }, [selectedBlogs])

    return (
        <div>
            {showMsg}
            <Button type='dashed' onClick={() => setOpen(true)} ><PlusOutlined /> Add new Blogs</Button>
            <div style={{ margin: '3% 0' }}>
                <Space>
                    <p>Select Blogs: </p>
                    <Select
                        placeholder={"select Blogs Name"}
                        onSelect={setSelectedBlogs}
                        value={selectedBlogs}
                        // onFocus={()=>setSfD(null)}
                        options={BlogsItem.map((item, i) => {
                            return ({
                                value: item.id,
                                label: item.name
                            })
                        })}
                    />
                    {selectedBlogs != null &&
                        <Button type='dashed' style={{ color: 'red', background: 'none' }}
                            onClick={deleteBlog}><DeleteOutlined /> Delete Blog</Button>
                    }

                </Space>

                {sfD != null && selectedBlogs != null &&
                    <AddBlogsDetails details={sfD} BlogsId={selectedBlogs} />
                }
            </div>

            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                footer={[
                    <Button type='primary' key={'btn'} onClick={addNewBlogs}>Add</Button>,
                ]}
            >
                <div style={{ flexDirection: 'column', display: 'flex', gap: 10, padding: '1%' }}>
                    <p>Blogs Name:</p>
                    <Input placeholder='Enter Blogs Name' onChange={(e) => setBlogsName(e.target.value)} />
                </div>
            </Modal>
        </div>
    )
}
