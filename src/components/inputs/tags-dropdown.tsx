"use client";

import { useEffect, useRef, useState } from "react"

import AddIcon from "@/assets/icons/add-icon.svg";
import Image from "next/image";


type Tag = string


type TagsDropdownProps = {
  existingTags?: Tag[]
}

const TagsDropdown = ({ existingTags = [] }: TagsDropdownProps) => {

  const [tags, setTags] = useState<Tag[]>(existingTags)

  let wrapperRef = useRef<HTMLDivElement>(null)
  let inputRef = useRef<HTMLInputElement>(null)

  const removeTag = (tag: Tag) => {
    const filteredTags = tags.filter(el => el !== tag);
    setTags(filteredTags)
  }

  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  const addTag = () => {
    if (inputRef.current && inputRef?.current.value) {
      const newTags = [...tags, inputRef.current.value]
      setTags(newTags)
      inputRef.current.value = ''
    }

  }

  useEffect(() => {

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;

      if (wrapperRef.current && !wrapperRef.current?.contains(target) && target.nodeName !== "SPAN") {
        setShowDropdown(false)
      }
    }
    if (showDropdown) {
      document.addEventListener("click", handleClick)
    }

    return () => document.removeEventListener("click", handleClick)
  }, [showDropdown])



  return (
    <div className="space-y-2">
      <label>Tags</label>
      {
        tags.map(tag => <input aria-hidden key={tag} hidden type="text" name="tags" readOnly={true} aria-readonly={true} value={tag} />)
      }

      <div ref={wrapperRef} className="relative">
        <div
          onClick={setShowDropdown.bind(null, true)}
          className="bg-black-one h-12 rounded-md relative flex justify-between items-center pr-3 border border-input"
        >
          <input
            ref={inputRef}
            onFocus={setShowDropdown.bind(null, true)}
            style={{ backgroundColor: "transparent" }}
            type="text"
            className="tags-input w-full h-full relative z-10"
          />
          {/* <span>+</span> */}
          <div className="tags-list absolute h-full w-full overflow-hidden inset-0 flex divide-x divide-solid space-x-2 flex items-center ">
            {
              tags.length > 0 ? <CurrentTagsList tags={tags} /> : <span className="text-secondary-white opacity-70 pl-3 text-sm">Tags to help you search</span>
            }
          </div>
          <span onClick={addTag} className="cursor-pointer relative z-20">
            <Image src={AddIcon} alt="add tag button" width={22} height={22} />
          </span>
        </div>

        {
          showDropdown && tags.length > 0 && <ul className="bg-black-one absolute bottom-12 w-full flex gap-x-2 py-2 px-2 min-h-28 items-start border border-input rounded-md">
            {
              tags.map(tag => <TagElement key={tag} tag={tag} removeTag={removeTag} />)
            }
          </ul>
        }
      </div>
    </div>
  )
}

export default TagsDropdown;


type TagElementProps = {
  tag: Tag
  removeTag: (tag: Tag) => void
}

const TagElement = ({ tag, removeTag }: TagElementProps) => {

  return (
    <li className="px-1 flex space-x-1 items-center py-1 w-max text-sm">
      <span>{tag}</span>
      <span onClick={removeTag.bind(null, tag)}>X</span>
    </li>
  )
}


const CurrentTagsList = ({ tags }: { tags: Tag[] }) => {
  return tags.map(tag => <span className="block pl-1.5 text-sm text-secondary-white opacity-70" key={tag}>{tag}</span>)
}