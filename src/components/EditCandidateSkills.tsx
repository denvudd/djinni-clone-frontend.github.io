import React from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';

import { TagsInput } from 'react-tag-input-component';
import { AddSkillRequest } from '@/lib/validators/add-skill';
import { type Skill } from '@/types';

interface EditCandidateSkillsProps {
  candidateId: string;
}

const EditCandidateSkills: React.FC<EditCandidateSkillsProps> = ({
  candidateId,
}) => {
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>([]);

  const {
    data: skills,
    isLoading: isSkillsLoading,
    refetch: skillsRefetch,
  } = useQuery(['skills'], {
    queryFn: async () => {
      const { data } = await axios.get(`/candidate/${candidateId}/skills`);

      setSelectedSkills(data.map((skill: Skill) => skill.name));

      return data as Skill[];
    },
  });

  const { mutate: addSkill } = useMutation({
    mutationFn: async ({ name }: AddSkillRequest) => {
      const payload: AddSkillRequest = {
        name,
      };

      const { data } = await axios.post(
        `/candidate/${candidateId}/skills`,
        payload,
      );

      return data;
    },
    onSuccess: (data) => {
      skillsRefetch();
    },
    onError: (error) => {
      console.log('[DEV]: ', error);
    },
  });

  const { mutate: removeSkill } = useMutation({
    mutationFn: async (name: string) => {
      const skill = skills?.find((skill) => skill.name === name);

      const { data } = await axios.delete(
        `/candidate/${candidateId}/skills/${skill?.id}`,
      );

      return data;
    },
  });

  const addSkillsFromTags = (tags: string[]) => {
    // if skill doesn't exist in selectedSkills then POST new skill
    tags.forEach((tag) => {
      if (!selectedSkills.includes(tag)) {
        addSkill({ name: tag });

        setSelectedSkills((selectedSkills) => [...selectedSkills, tag]);
      }
    });
  };

  const removeSkillsFromTags = (tag: string) => {
    removeSkill(tag);

    setSelectedSkills((selectedSkills) =>
      selectedSkills.filter((skill) => skill !== tag),
    );
  };

  return (
    <TagsInput
      value={[...selectedSkills]}
      onChange={(tags) => {
        addSkillsFromTags(tags);
      }}
      name="fruits"
      onRemoved={(tag) => {
        removeSkillsFromTags(tag);
      }}
      disabled={isSkillsLoading}
      placeHolder="Введіть та натисніть Enter..."
      classNames={{
        input: 'placeholder:text-sm text-sm',
        tag: 'text-sm bg-white text-white',
      }}
    />
  );
};

export default EditCandidateSkills;
