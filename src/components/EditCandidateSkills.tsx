import React from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { TagsInput } from 'react-tag-input-component';
import { AxiosError } from 'axios';
import axios from '@/lib/axios';

import { AddSkillRequest } from '@/lib/validators/add-skill';
import { type Skill } from '@/types';

interface EditCandidateSkillsProps {
  candidateId: string;
}

const EditCandidateSkills: React.FC<EditCandidateSkillsProps> = ({ candidateId }) => {
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>([]);

  const {
    data: skills,
    isLoading: isSkillsLoading,
    refetch: skillsRefetch,
  } = useQuery(['skills'], {
    queryFn: async () => {
      const { data } = await axios.get(`/candidate/${candidateId}/skills`);

      if (data instanceof AxiosError) {
        throw new Error();
      }

      return data as Skill[];
    },
    onSuccess: (data) => {
      setSelectedSkills(data.map((skill) => skill.name));
    },
  });

  const { mutate: addSkill } = useMutation({
    mutationFn: async ({ name }: AddSkillRequest) => {
      const payload: AddSkillRequest = {
        name,
      };

      const { data } = await axios.post(`/candidate/${candidateId}/skills`, payload);

      return data as Skill[];
    },
    onSuccess: async () => {
      await skillsRefetch();
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
    },
  });

  const { mutate: removeSkill } = useMutation({
    mutationFn: async (name: string) => {
      const skill = skills?.find((skill) => skill.name === name);

      const { data } = await axios.delete(`/candidate/${candidateId}/skills/${skill?.id}`);

      return data as Skill & { success: true };
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

    setSelectedSkills((selectedSkills) => selectedSkills.filter((skill) => skill !== tag));
  };

  return (
    <TagsInput
      value={[...selectedSkills]}
      onChange={(tags) => {
        addSkillsFromTags(tags);
      }}
      name="skills"
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
